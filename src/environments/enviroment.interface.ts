export interface Environment {
    production: boolean;
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string
    };
    algolia: {
        appId: string;
        apiKey: string;
    };
}
