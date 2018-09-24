
var navNodesProviderFn = (context) => {
  return new Promise(function (resolve) {
    $.get( "https://navigation-node-srv.us-east.internal.yaas.io/api/navigation", function( data ) {
      $.each( data, (index, node )=>{
        node.context={
          title : node.label
        }
      });
      resolve(data);
    });
  });
};

Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        children: [
          {
            pathSegment: 'hw',
            label: 'Home',
            viewUrl: '/assets/hello.html'
          },
          {
            pathSegment: 'vue',
            label: 'Product OverVue',
            viewUrl: 'http://localhost:8080/list',
            children: [{
                pathSegment: 'details',
                label: 'details',
                viewUrl: `http://localhost:8080/list/{nodeParams.name}`
                // hideFromNav: true,
              }
            ],
            context: {
              token : JSON.parse(localStorage.getItem('luigi.auth')).accessToken
            }
          },
          {
            pathSegment: 'sapui5',
            label: 'Product Editor - SAP UI 5',
            viewUrl: 'https://luigidemosapui5-i303803trial.dispatcher.hanatrial.ondemand.com/webapp/index.html?hc_reset'
          },
          {
            pathSegment: 'lazy',
            label: 'Lazy Loaded',
            children : navNodesProviderFn
          }
        ]
      }
    ]
  },
  settings: {
    // backdropDisabled : true
  },
  routing: {
    useHashRouting: true
  },
  auth: {
    use: 'openIdConnect',
    openIdConnect: {
      authority: 'https://accounts.google.com',
      client_id: '478154255287-8kr86s42k0kqjsmb427j3sq45ed2cl1p.apps.googleusercontent.com',
      scope:
        'openid email',
      // redirect_uri: 'http://console-dev.kyma.local:4200',
      // automaticSilentRenew: true,
      loadUserInfo: false,
      logoutFn: (settings, authData, logoutCallback) => {
        localStorage.clear();
        window.location = "https://accounts.google.com/Logout"
      },
      nonceFn: () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    }
  }
});
