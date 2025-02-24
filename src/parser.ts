import postcss from 'postcss';
import postcssJs, { objectify, CssInJs } from 'postcss-js';

export const toJS = (css: string) => {
  try {
    const code = postcssJs.objectify(postcss.parse(css));
    const jsCode = JSON.stringify(code, null, 2)
      .replace(/'/g, `\\'`)
      .replace(/"/g, `'`)
      .replace(/'(?=.*:)/g, '')
      .split('\n')
      .map((line) => {
        if (line.match(/[\-@:&%\.#](?=.*:)/g)) {
          return line.replace(/(\S.*)(?=:)/, `'$1'`);
        }

        return line;
      })
      .join('\n');
    return `${jsCode}`;
    // return `(${jsCode});`;
  } catch (err) {
    console.error("Couldn't convert CSS to JS.", err);
  }
};

export const toCSS = async (js: string) => {
  try {
    // biome-ignore lint/style/useConst: <explanation>
    let val: postcssJs.CssInJs = {};
    // biome-ignore lint/security/noGlobalEval: <explanation>
    eval(`val = ${js}`);
    // postcss()
    //   .process(val, { parser: postcssJs })
    //   .then((result) => callback(result.css));

    const result = await postcss().process(val, { parser: postcssJs });
    return result.css;
    // postcss()
    //   .process(val, { parser: objectify }) // Use objectify as the parser
    //   .then((result) => cb(result.css));
  } catch (err) {
    console.error("Couldn't convert JS to CSS.", err);
  }
};
