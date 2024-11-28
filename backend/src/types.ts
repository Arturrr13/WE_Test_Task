export interface UserT {
    dataValues: DataValues;
}

export interface DataValues {
    id:       string;
    name:     string;
    email:    string;
    password: string;
    isactive: boolean;
    tstz:     Date;
}

export interface LoginRes {
    id:            string;
    name?:          string;
    email?:         string;
    password?:      string;
    isactive?:      boolean;
    tstz?:          Date;
    user_id?:       string;
    access_token?:  string;
    refresh_token?: string;
}

export interface ErrorsT {
    [key: string]: {
        status:  number;
        message: string;
    } 
}

export interface BadRequest {
    status:  number;
    message: string;
}

export interface userData {
    id:          string;
    firstname:   string;
    lastname:    string;
    dateofbirth: string;
    email:       string;
    phone:       string;
    logo:        string;
    password:    null;
    adminstatus: boolean;
    tstz:        Date;
}