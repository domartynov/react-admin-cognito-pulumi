import {cognitoRegionId, cognitoUserPoolId, cognitoAppClientId} from "./backend-config.json"
import {Auth} from "@aws-amplify/auth";
import {AuthProvider as RaAuthProvider, UserIdentity} from "react-admin";

Auth.configure({
    region: cognitoRegionId,
    userPoolId: cognitoUserPoolId,
    userPoolWebClientId: cognitoAppClientId
})

const guestIdentity = { id: '', fullName: 'Guest'}

export interface LoginParams {
    username: string
    password: string
}

interface NewPasswordRequiredUser {
    user: any
}

class CognitoAuthProvider implements RaAuthProvider {
    newPasswordRequired: NewPasswordRequiredUser | null = null

    async login({username, password}: { username: string, password: string }): Promise<any> {
        const user = await Auth.signIn(username, password)
        if (user.challengeName == 'NEW_PASSWORD_REQUIRED') {
            this.newPasswordRequired = {user}
        }
        return user
    }

    async completeNewPassword(newPassword: string) {
        if (this.newPasswordRequired == null) throw {message: 'Unexpected'}
        await Auth.completeNewPassword(this.newPasswordRequired.user, newPassword)
    }

    async checkAuth(): Promise<void> {
        if (this.newPasswordRequired != null) {
            throw {redirectTo: '/new-password-required'}
        } else {
            const s = await Auth.currentSession()
            if (s == null) throw 'Unauthorized'
        }
    }

    checkError(error: any): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getIdentity(): Promise<UserIdentity> {
        try {
            const s = await Auth.currentAuthenticatedUser()
            if (s == null) return guestIdentity
            return {id: s.username, fullName: s.username }
        } catch {
            return guestIdentity
        }
    }

    getPermissions(params: any): Promise<any> {
        return Promise.resolve({});
    }

    logout(): Promise<void | false | string> {
        return Auth.signOut()
    }
}

export const authProvider = new CognitoAuthProvider()