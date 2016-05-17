var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

// on peut passer à notre commande de build l'option --production
// on récupère sa valeur ici en tant que booléen
var production = process.argv.indexOf("--production") > -1

module.exports = {
  // nos points d'entrée, par clé
  // (on peut en définir plusieurs)
  entry: {
    index: [
      "../client/controller/HttpController.js",
    ],
  },

  // description de nos sorties
  output: {
   path: path.join(__dirname, "dist"),
    // nous aurons (vu notre point d'entrée)
    // - dist/index.js
   filename: "HttpController.js",
   // filename: "output.js",
    // notre base url
    publicPath: "/",
  },

  resolve: {
    // ici, on peut ajouter nos extensions à résoudre lors d'un require()
    // on va rester simple en n'autorisant rien, ou .js(on) (comme en nodejs et
    // browserify)
    extensions: [
      "",
      ".js",
      ".json",
    ],
  },

  module: {
    // liste de nos loaders
    // ! \\ à noter que les loaders sont exécutés en ordre inverse
    // les premiers en dernier, en utilisant la sortie du suivant
    loaders: [
      {
        // pour tous les fichiers qui finissent par .js
        test: /\.js$/,
        // ... en prenant bien soin d'exclure les node_modules
        exclude: /node_modules/,

        // on ajoute les loaders babel et eslint
        // à vous de voir ce que vous aurez besoin
        // ("rien" est une option tout à fait valable si vous codez en ES5
        // sans linter)
        loaders: [
          "babel",
          "eslint",
        ],

        // à noter que l'on peut définir les loaders de cette façon
        // loader: "babel!eslint",

        // à noter aussi, Webpack va tenter de loader des modules ayant dans
        // leur nom "-loader". Si ce n'était pas le cas, ou que votre loader
        // ne comporte pas -loader, vous pouvez spécifier le nom entier :
        // loader: "babel-loader!eslint-loader",
      },
      {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /\.js6$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
            presets: ['es2015']
        }
      },
    ]
  },

  // en plus des loaders, qui premettent eux de modifier et/ou d'exploiter le
  // contenu des modules, nous avons des plugins, plus globaux au processus
  plugins: (
    [
      // ce plugin permet de transformer les clés passés en dur dans les
      // modules ainsi vous pourrez faire dans votre code js
      // if (__PROD__) { ... }
      new webpack.DefinePlugin({
        __PROD__: production
      }),
    ]
    // en production, on peut rajouter des plugins pour optimiser
    .concat(
      production
      ? [
        // ici on rajoute uglify.js pour compresser nos sorties
        // (vous remarquerez que certain plugins sont directement livrés dans
        // le package webpack).
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ]
      : []
    )
  ),

  // certains modules permettent de définir des options en dehors de la
  // définition des loaders
  cssnext: {
    sourcemap: !production,
    compress: production,
  },
}
