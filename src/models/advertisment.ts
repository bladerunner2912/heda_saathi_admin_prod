import mongoose, { Types, Document, Schema } from "mongoose";

export interface IAdvertisment{
 
    imageBanner : String,
    advertismentLink : String,
}



export interface IAdvertismentModel extends IAdvertisment, Document {};



const AdvertismentSchema : Schema = new Schema(
{

    imageBanner : {type : String, required : true},
    advertismentLink : {type : String, required : true} 
},
{

    timestamps : {
        createdAt : "created_At"
    }

}
);


export default mongoose.model("Advertisment", AdvertismentSchema);

