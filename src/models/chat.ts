// import { Type } from "aws-sdk/clients/cloudformation";
// import { DateTime } from "aws-sdk/clients/devicefarm";
// import mongoose, { Types, Document, Schema } from "mongoose";


// export interface Chat{
//     message : String;
//     dateTime : DateTime;
// }


// export interface IChat{
//     client_one_id : Types.ObjectId;
//     client_two_id : Types.ObjectId;
//     client_one : Array<Chat>;
//     client_two : Array<Chat>;
// }


// export interface IChatModel extends IChat , Document {}



// const ChatSchema :Schema = new Schema({
//     client_one_id : {required : true,type : Schema.Types.ObjectId,ref : "User" },
//     client_two_id : {required : true,type : Schema.Types.ObjectId,ref : "User" },
//     client_one : {type : Array<Chat>},
//     client_two : {type : Array<Chat>}
// })