#!/usr/bin/env node
const esprima = require('esprima');
const escodegen = require('escodegen');
const esmangle = require('esmangle');
const fs = require('fs');

if (!process.argv[2]) {
  console.warn('Please provide a filepath');
} else {
  const code = fs.readFileSync(process.argv[2]).toString();
  
  const ast = esprima.parse(code);
  // Get optimized AST
  const optimized = esmangle.optimize(ast, null);
  // gets mangled AST
  const result = esmangle.mangle(optimized);
  console.log(escodegen.generate(result, {
      format: {
          renumber: true,
          hexadecimal: true,
          escapeless: true,
          compact: true,
          semicolons: false,
          parentheses: false
      }
  }));
}

