#!/usr/bin/env python3
"""OpenMontage Audio Studio — High-quality TTS generation, broadcast mastering, and sidechain ducking."""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import subprocess
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

MASTERING_PRESETS = {
    "broadcast": {
        "description": "Son publicitaire percutant : clarté vocale + chaleur + compression dynamique (-14 LUFS)",
        "af": (
            "highpass=f=80,"
            "lowpass=f=15000,"
            "equalizer=f=180:t=q:w=1.0:g=1.5,"
            "equalizer=f=3200:t=q:w=1.2:g=2.5,"
            "equalizer=f=6800:t=q:w=2.0:g=-1.5,"
            "acompressor=threshold=-16dB:ratio=3.5:attack=3:release=80:makeup=2,"
            "loudnorm=I=-14:LRA=7:TP=-1.5"
        ),
    },
    "podcast": {
        "description": "Voix posée et chaleureuse type studio podcast (-16 LUFS)",
        "af": (
            "highpass=f=80,"
            "equalizer=f=150:t=q:w=1.0:g=2.0,"
            "equalizer=f=3000:t=q:w=1.2:g=1.5,"
            "acompressor=threshold=-18dB:ratio=4:attack=5:release=100:makeup=2,"
            "loudnorm=I=-16:LRA=7:TP=-1.5"
        ),
    },
    "clean_speech": {
        "description": "Voix neutre, nette et équilibrée (-16 LUFS)",
        "af": (
            "highpass=f=80,"
            "lowpass=f=13000,"
            "agate=threshold=0.01:ratio=2:attack=5:release=50,"
            "acompressor=threshold=-20dB:ratio=3:attack=5:release=100,"
            "loudnorm=I=-16:LRA=11:TP=-1.5"
        ),
    },
}

FRENCH_VOICES = {
    "remy_multilingual": {
        "engine": "edge",
        "voice_id": "fr-FR-RemyMultilingualNeural",
        "label": "Rémy (Homme • Studio Chaleureux & Moderne)",
    },
    "vivienne_multilingual": {
        "engine": "edge",
        "voice_id": "fr-FR-VivienneMultilingualNeural",
        "label": "Vivienne (Femme • Studio Naturel & Élégant)",
    },
    "henri": {
        "engine": "edge",
        "voice_id": "fr-FR-HenriNeural",
        "label": "Henri (Homme • Institutionnel & Posé)",
    },
    "denise": {
        "engine": "edge",
        "voice_id": "fr-FR-DeniseNeural",
        "label": "Denise (Femme • Douce & Commerciale)",
    },
}


async def generate_edge_tts(text: str, voice_id: str, out_raw: Path, rate: str = "+2%") -> list[dict]:
    import edge_tts

    communicate = edge_tts.Communicate(text, voice_id, rate=rate)
    boundaries = []
    out_raw.parent.mkdir(parents=True, exist_ok=True)
    with open(out_raw, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "SentenceBoundary":
                boundaries.append({
                    "offset_ms": chunk["offset"] / 10000.0,
                    "duration_ms": chunk["duration"] / 10000.0,
                    "text": chunk["text"],
                })
    return boundaries


def master_audio(in_path: Path, out_path: Path, preset: str = "broadcast") -> None:
    if preset not in MASTERING_PRESETS:
        raise ValueError(f"Preset inconnu: {preset}. Choix: {list(MASTERING_PRESETS)}")
    af = MASTERING_PRESETS[preset]["af"]
    cmd = [
        "ffmpeg", "-y", "-i", str(in_path),
        "-af", af,
        "-ar", "48000", "-b:a", "192k",
        str(out_path),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def duck_music_with_voice(
    music_path: Path,
    voice_path: Path,
    out_music_path: Path,
    duration_sec: float,
    base_volume: float = 0.85,
) -> None:
    """Applique un sidechain ducking sur la musique piloté par la piste vocale."""
    filter_complex = (
        f"[0:a]atrim=0:{duration_sec},afade=t=in:ss=0:d=0.8,afade=t=out:st={max(0, duration_sec - 2.0)}:d=2.0,volume={base_volume}[bg];"
        f"[bg][1:a]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=350:level_sc=1[ducked];"
        f"[ducked]aresample=48000[out]"
    )
    cmd = [
        "ffmpeg", "-y",
        "-i", str(music_path),
        "-i", str(voice_path),
        "-filter_complex", filter_complex,
        "-map", "[out]",
        "-ar", "48000", "-b:a", "192k",
        str(out_music_path),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def check_providers() -> dict[str, str]:
    """Vérifie la disponibilité des moteurs TTS/Audio (local et cloud)."""
    import urllib.request
    status: dict[str, str] = {}

    try:
        import edge_tts  # noqa: F401
        status["edge_tts"] = "OK (gratuit, en ligne)"
    except ImportError:
        status["edge_tts"] = "NON INSTALLÉ"

    fal_key = os.getenv("FAL_KEY", "").strip()
    if not fal_key:
        status["fal_ai"] = "NON CONFIGURÉ (FAL_KEY absent)"
    else:
        try:
            req = urllib.request.Request(
                "https://rest.alpha.fal.ai/storage/upload/initiate",
                method="POST",
                headers={"Authorization": f"Key {fal_key}", "Content-Type": "application/json"},
                data=b'{"file_name":"ping.txt","content_type":"text/plain"}',
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                status["fal_ai"] = f"OK (HTTP {resp.status})"
        except Exception as exc:
            status["fal_ai"] = f"ERREUR ({exc})"

    el_key = os.getenv("ELEVENLABS_API_KEY", "").strip()
    status["elevenlabs_direct"] = "CONFIGURÉ" if el_key else "NON CONFIGURÉ"
    return status


def main() -> None:
    parser = argparse.ArgumentParser(description="OpenMontage Audio Studio")
    parser.add_argument("--list-options", action="store_true", help="Afficher les voix et préréglages disponibles")
    parser.add_argument("--check-providers", action="store_true", help="Tester la disponibilité des moteurs TTS")
    parser.add_argument("--preview", action="store_true", help="Générer uniquement un extrait court de 4 secondes")
    parser.add_argument("--text", type=str, help="Texte à synthétiser")
    parser.add_argument("--voice", type=str, default="remy_multilingual", choices=list(FRENCH_VOICES.keys()))
    parser.add_argument("--preset", type=str, default="broadcast", choices=list(MASTERING_PRESETS.keys()))
    parser.add_argument("--rate", type=str, default="+2%")
    parser.add_argument("--out", type=str, help="Chemin du fichier MP3 masterisé de sortie")
    parser.add_argument("--boundaries-out", type=str, help="Chemin JSON optionnel pour les bornes de phrases")
    args = parser.parse_args()

    if args.check_providers:
        print("=== ÉTAT DES MOTEURS AUDIO ===")
        for k, v in check_providers().items():
            print(f"  - {k}: {v}")
        return

    if args.list_options:
        print("=== VOIX DISPONIBLES ===")
        for k, v in FRENCH_VOICES.items():
            print(f"  - {k}: {v['label']} ({v['voice_id']})")
        print("\n=== PRÉRÉGLAGES MASTERING ===")
        for k, v in MASTERING_PRESETS.items():
            print(f"  - {k}: {v['description']}")
        return

    if not args.text or not args.out:
        parser.error("--text et --out sont requis (ou utilisez --list-options)")

    out_path = Path(args.out)
    raw_path = out_path.with_name(out_path.stem + "_raw.mp3")
    voice_cfg = FRENCH_VOICES[args.voice]

    text_to_speak = args.text[:140] if args.preview else args.text
    boundaries = asyncio.run(generate_edge_tts(text_to_speak, voice_cfg["voice_id"], raw_path, rate=args.rate))
    if args.preview:
        trim_raw = out_path.with_name(out_path.stem + "_trim.mp3")
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(raw_path), "-t", "4.0", str(trim_raw)],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        master_audio(trim_raw, out_path, preset=args.preset)
        if trim_raw.exists():
            trim_raw.unlink()
    else:
        master_audio(raw_path, out_path, preset=args.preset)
    if raw_path.exists():
        raw_path.unlink()

    if args.boundaries_out:
        with open(args.boundaries_out, "w", encoding="utf-8") as f:
            json.dump(boundaries, f, indent=2, ensure_ascii=False)

    print(f"Audio masterisé généré : {out_path} (voix={args.voice}, preset={args.preset})")


if __name__ == "__main__":
    main()
