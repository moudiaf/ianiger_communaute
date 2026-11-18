#!/usr/bin/env python3
"""OpenMontage Release Pipeline — Typecheck, Master Render, 720p WhatsApp Export & QA Audit."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REMOTION_DIR = ROOT / "remotion-composer"


def run_step(cmd: list[str], cwd: Path = ROOT) -> None:
    print(f"> {' '.join(cmd)}")
    subprocess.run(cmd, cwd=str(cwd), check=True)


def ffprobe_info(video_path: Path) -> dict:
    res = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration,size,bit_rate",
            "-show_entries", "stream=codec_name,codec_type,width,height,r_frame_rate",
            "-of", "json", str(video_path),
        ],
        capture_output=True, text=True, check=True,
    )
    return json.loads(res.stdout)


def extract_qa_frames(video_path: Path, out_dir: Path, duration: float) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    points = [
        ("qa_start.jpg", min(1.5, duration * 0.1)),
        ("qa_mid.jpg", duration * 0.5),
        ("qa_end.jpg", max(0.0, duration - 1.5)),
    ]
    for name, ts in points:
        subprocess.run(
            ["ffmpeg", "-y", "-ss", f"{ts:.3f}", "-i", str(video_path), "-vframes", "1", str(out_dir / name)],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )


def export_720p_whatsapp(master_path: Path, out_720p: Path) -> None:
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", str(master_path),
            "-vf", "scale='min(1280,iw)':-2",
            "-c:v", "libx264", "-crf", "28", "-preset", "slow",
            "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
            str(out_720p),
        ],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Release QA & Multi-Format Export")
    parser.add_argument("composition_id", help="ID de la composition Remotion (ex: GeometrieCM2)")
    parser.add_argument("project_slug", help="Nom du dossier projet sous projects/ (ex: geometrie-cm2-niger)")
    parser.add_argument("--skip-render", action="store_true", help="Sauter le rendu Remotion si le master existe")
    args = parser.parse_args()

    renders_dir = ROOT / "projects" / args.project_slug / "renders"
    renders_dir.mkdir(parents=True, exist_ok=True)
    master_path = renders_dir / f"{args.project_slug}_master.mp4"
    mobile_path = renders_dir / f"{args.project_slug}_720p_whatsapp.mp4"

    # 1. Typecheck Remotion
    print("=== 1. Vérification TypeScript ===")
    run_step(["npx.cmd" if sys.platform == "win32" else "npx", "tsc", "--noEmit"], cwd=REMOTION_DIR)

    # 2. Render Master
    if not args.skip_render:
        print("=== 2. Rendu Master Remotion ===")
        run_step(
            [
                "npx.cmd" if sys.platform == "win32" else "npx",
                "remotion", "render", "src/index.tsx",
                args.composition_id, str(master_path), "--gl=angle",
            ],
            cwd=REMOTION_DIR,
        )

    if not master_path.is_file():
        raise FileNotFoundError(f"Master introuvable : {master_path}")

    # 3. Export 720p WhatsApp
    print("=== 3. Export Mobile 720p WhatsApp ===")
    export_720p_whatsapp(master_path, mobile_path)

    # 4. Audit ffprobe + 3 vignettes QA
    print("=== 4. Audit QA & Vignettes ===")
    info = ffprobe_info(master_path)
    dur = float(info["format"]["duration"])
    extract_qa_frames(master_path, renders_dir / "qa_frames", dur)

    mobile_size_mb = mobile_path.stat().st_size / (1024 * 1024)
    master_size_mb = master_path.stat().st_size / (1024 * 1024)
    print(f"Master : {master_path} ({master_size_mb:.2f} MB, {dur:.2f} s)")
    print(f"720p   : {mobile_path} ({mobile_size_mb:.2f} MB)")
    print("QA OK.")


if __name__ == "__main__":
    main()
