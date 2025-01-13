import mongoose from "mongoose";

interface IRoom extends mongoose.Document {
  _id: string;
  userIds: string[];
}

const roomSchema = new mongoose.Schema<IRoom>({
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<IRoom>("Room", roomSchema);
