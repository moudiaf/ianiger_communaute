import { Solid, Interactive } from 'remotion';
import React from 'react';

export const Test1NewComposition: React.FC = () => {
	return (
		<>
			<Solid
				width={1080}
				height={1920}
				color="gray"
				style={{ position: 'absolute' }}
			/>
			<Interactive.Div
				name="Text"
				style={{
					position: 'absolute',
					translate: '465.7px 913px',
					fontFamily: 'sans-serif',
					fontSize: 81,
					color: 'white'
				}}
			>Text</Interactive.Div>
			<Solid
				width={1080}
				height={1920}
				color="gray"
				style={{ position: 'absolute' }}
			/>
		</>
	);
};
