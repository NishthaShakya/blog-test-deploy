import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
//conf obj and class properties from appwrite SDK

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);  //Appwrite's SDKs have a helper ID.unique() to generate unique IDs.
            if (userAccount) {
                //next step login
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            //after email,user can logged in using Create Email Session route
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
     //get for currently logged in user
    async getCurrentUser() {
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    // async initiateVerification() {
    //     try {
    //         const result = await this.account.createVerification(ID.unique());

    //         console.log("Verification initiated successfully:", result);

    //     } catch (error) {
    //         console.error("Error initiating verification:", error);
    //     }
    // }

    // async updateVerification() {
    //     try {
    //         return await this.account.updateVerification(ID.unique(),secret)

    //     } catch (error) {
    //         console.error("Error updatinng verification:", error)

    //     }
    // }
        
}

    
const authService = new AuthService();
export default authService








