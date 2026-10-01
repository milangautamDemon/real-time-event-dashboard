import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  id: string;
  user_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user_id: {
      type: String,
      required: true,
      index: true,
    },

    event_type: {
      type: String,
      required: true,
      index: true,
    },

    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

eventSchema.index({
  event_type: 1,
  timestamp: -1,
});

export const Event = mongoose.model<IEvent>("Event", eventSchema);
