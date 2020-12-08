var SincroAuth = {
    apiUrl: 'https://mydata.sincro.fr/sincro-auth',
    apiTokenTagName: 'sincro-auth-api-token',

    /** 
     * GÃ©nÃ¨re une URL dâ€™authentification Ã  la plateforme Sincro pour le couple identifiant / mot de passe
     * passÃ© en paramÃ¨tre (lâ€™URL expire au bout de 20 secondes). 
     * 
     * ParamÃ¨tres:
     * - login: Identifiant de lâ€™utilisateur Sincro
     * - password: Mot de passe de lâ€™utilisateur
     * - onSucceed: Callback appelÃ©e suite Ã  une rÃ©ponse au statut 200. Un objet AuthResponse lui est passÃ©e (description plus bas)
     * - onError: Callback appelÃ©e suite Ã  une rÃ©ponse autre que le statut 200. Un objet AuthResponse lui est passÃ©e (description plus bas)
     * */
    basicAuth: function (login, password, onSucceed, onError) {
        SincroAuth.post('/api/auth', {
            login: login,
            password: password
        }, onSucceed, onError);
    },

    /** 
     * GÃ©nÃ¨re une URL dâ€™authentification Ã  la plateforme Sincro pour le token dâ€™authentification Google
     * passÃ© en paramÃ¨tre (lâ€™URL expire au bout de 20 secondes). 
     * 
     * ParamÃ¨tres:
     * - googleToken: Token dâ€™authentification Google
     * - onSucceed: Callback appelÃ©e suite Ã  une rÃ©ponse au statut 200. Un objet AuthResponse lui est passÃ©e (description plus bas)
     * - onError: Callback appelÃ©e suite Ã  une rÃ©ponse autre que le statut 200. Un objet AuthResponse lui est passÃ©e (description plus haut)
     * */
    googleAuth: function (googleToken, onSucceed, onError) {
        SincroAuth.post('/api/auth/gauth', googleToken, onSucceed, onError);
    },

    /** MÃ©thode interne */
    getMeta: function (metaName) {
        var metas = document.getElementsByTagName('meta');
        
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
            }
        }
        return '';
    },

    /** MÃ©thode interne */
    post: function (url, content, onSucceed, onError) {
        var apiKey = SincroAuth.getMeta(SincroAuth.apiTokenTagName);

        if (!apiKey) {
            console.error('SincroAuth: apiKey is invalid. Did you forget to add this tag <meta name="'+ SincroAuth.apiTokenTagName + '" content="YOUR_SINCRO_AUTH_API_KEY">?')
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', SincroAuth.apiUrl + url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Ocp-Apim-Subscription-Key', apiKey);
        xhr.onload = function() {
            if (xhr.status === 200) {
                onSucceed(JSON.parse(xhr.responseText));
            } else {
                onError(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(JSON.stringify(content));
    }
};