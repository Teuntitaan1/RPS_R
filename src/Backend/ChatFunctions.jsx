export function Generate_Message(Message, User, To) {
    return {
        Date_Send : Date.now(),
        Content : Message,
        Author : User,
        To : To
    }
}
export function Generate_User(Name, Alias) {
    return {
        Username : Name,
        Alias : Alias
    }
}

export function GenerateChat(Name, Description, ) {
    return {
        Name : Name,
        Description : Description,
        Chat_Creation_Date : Date.now(),
    
        Messages : [],
    }
}