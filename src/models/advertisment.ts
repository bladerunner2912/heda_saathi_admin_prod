import mongoose, { Types, Document, Schema } from "mongoose";
export interface IAdvertisment {

    posterUrl: String,
    advertismentLink: String,
}

export interface IAdvertismentModel extends IAdvertisment, Document { };

const AdvertismentSchema: Schema = new Schema(
    {

        posterUrl: { type: String, required: true },
        advertismentLink: { type: String, required: true }
    },
    {

        timestamps: {
            createdAt: "created_At"
        }

    }
);

const Advertisment = mongoose.model("Advertisment", AdvertismentSchema);

export default Advertisment;
