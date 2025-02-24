import { useEffect, useRef, useState } from 'react';
import './App.css';
import { toCSS, toJS } from './parser';

function App() {
	const [count, setCount] = useState(0);

	const ref1 = useRef<HTMLTextAreaElement>(null);
	const ref2 = useRef<HTMLTextAreaElement>(null);
	const ref3 = useRef<HTMLTextAreaElement>(null);

	const convert = () => {
		const text = ref1.current?.value;
		if (!text) return;

		const js = toJS(text);
		if (ref2.current && js) {
			ref2.current.value = js;
		}
	};
	const convert2 = async () => {
		const text = ref2.current?.value;
		if (!text) return;

		const css = await toCSS(text);
		if (ref3.current && css) {
			ref3.current.value = css;
		}
	};

	useEffect(() => {
		if (!ref1.current) return;
		ref1.current.value = INITIAL_CSS_CODE;
	}, []);

	return (
		<div>
			<textarea rows={20} cols={60} ref={ref1} />
			<textarea rows={20} cols={60} ref={ref2} />
			<textarea rows={20} cols={60} ref={ref3} />
			<button type="button" onClick={convert}>
				convert
			</button>
			<button type="button" onClick={convert2}>
				convert2
			</button>
		</div>
	);
}

export default App;
const style = {
	top: 10,
	'&:hover': {
		top: 5,
	},
};

const theme = {
	PRIMARY: '#c7446f',
	SECONDARY: '#002451',
	TERTIARY: '#a4234c',
};

const INITIAL_CSS_CODE = `
background: royalblue;
text-align: center;
border: solid 2px green;
font-family: 'Slabo', serif;
-webkit-user-select: none;
&:hover {
    color: #C0FFEE
}
@media (max-width: 500px) {
    & {
        color: #BADA55;
    }
}
`.trim();
