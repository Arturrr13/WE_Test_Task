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