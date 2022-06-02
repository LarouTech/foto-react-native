const plopConfig = (plop) => {
  plop.setGenerator('jsx', {
    description: 'this is a starter JSX component',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'What is the component name?'
      },
      {
        type: 'input',
        name: 'path',
        message: 'What is the path of the JSX components i.e: /components'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '.{{path}}/{{title}}.tsx',
        templateFile: './templates/JSX_template.hbs'
      }
    ]
  }),
    plop.setGenerator('reducer', {
      description: 'This is starter React Reducer file bolierplate',
      prompts: [
        {
          type: 'input',
          name: 'title',
          message: 'What is the reducer and/or state name'
        },
        {
          type: 'input',
          name: 'path',
          message: 'What is the path of the Reducer i.e: /reducers'
        },
        {
          type: 'confirm',
          name: 'isContext',
          message: 'Add context to reducer file'
        }
      ],
      actions: [
        {
          type: 'add',
          path: '.{{path}}/{{title}}Reducer.tsx',
          templateFile: './templates/Reducer_template.hbs'
        }
      ]
    });
};

module.exports = plopConfig;
