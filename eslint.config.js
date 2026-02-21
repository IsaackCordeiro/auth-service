module.exports = [
    {
        ignores: ['node_modules/**'] // Não verifica as bibliotecas
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs'
        },
        rules: {
            'no-unused-vars': 'warn', // Avisa se criar variável e não usar
            'no-console': 'off',      // Permite o console.log
            'semi': ['error', 'always'], // Obriga o uso de ponto e vírgula
            'quotes': ['error', 'single'] // Padroniza tudo para aspas simples
        }
    }
];