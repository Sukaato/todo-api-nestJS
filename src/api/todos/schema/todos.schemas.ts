import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class Todo extends Document {

    @Prop({required: true, unique: true, minlength: 10, maxlength: 50})
    title: string;

    @Prop({required: true, minlength: 20, maxlength: 200})
    description: string;

    @Prop({required: true, default: 'to do', enum: ['to do', 'in progress', 'done'] })
    status: string;
}

export const TodoSchemas = SchemaFactory.createForClass(Todo);