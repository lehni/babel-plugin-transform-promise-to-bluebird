"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promiseToBluebird;

var _helperModuleImports = require("@babel/helper-module-imports");

function promiseToBluebird({
  types: t
}) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        const node = path.node,
              parent = path.parent,
              scope = path.scope;
        if (node.name !== 'Promise') return;
        if (t.isMemberExpression(parent)) return;
        if (scope.getBindingIdentifier('Promise')) return;
        path.replaceWith((0, _helperModuleImports.addNamed)(path, 'default', 'bluebird', {
          nameHint: 'Promise'
        }));
      },

      MemberExpression(path) {
        const node = path.node;
        const obj = node.object;
        if (obj.name !== 'Promise') return;
        if (!path.isReferenced()) return;
        if (path.scope.getBindingIdentifier('Promise')) return;

        if (node.computed) {
          path.replaceWith(t.memberExpression((0, _helperModuleImports.addNamed)(path, 'default', 'bluebird', {
            nameHint: 'Promise'
          }), node.property, true));
        } else {
          path.replaceWith((0, _helperModuleImports.addNamed)(path, node.property.name, 'bluebird', {
            nameHint: 'Promise'
          }));
        }
      }

    }
  };
}

//# sourceMappingURL=main.es5.js.map