export type account = {
    accountName: string,
    email: string,
    userToken: string
};

let account: account = {
    accountName: "",
    email: "",
    userToken: ""
}

export async function getToken(): Promise<string> {
    if (account.userToken)
        // prompt login window and get user token
        return account.userToken; // return user token
    else
        return (await login()).userToken;
}

export async function validateToken(token: string): Promise<boolean> {
    void token;
    // validate the token
    return false;
}

export async function login(): Promise<account> {
    const data = {accountName: "", email: "", userToken: ""};

    account = data;

    return data;
}
