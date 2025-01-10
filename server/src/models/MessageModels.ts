import mongoose from "mongoose";

interface IMessage extends mongoose.Document {
  sender: string;
  receiver: string;
  message: string;
  room: string;
  timestamp: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  room: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);
