Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        children: [
          {
            pathSegment: 'hw',
            label: 'Hello World!',
            viewUrl: '/assets/hello.html'
          }
        ]
      }
    ]
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
