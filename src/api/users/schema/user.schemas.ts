import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Todo, TodoSchemas } from "src/api/todos/schema/todos.schemas";

@Schema()
export class User extends Document {

    @Prop({ required: true, unique: true, minlength: 6, maxlength: 50 })
    username: string;

    @Prop({ required: true, minlength: 6, maxlength: 100 })
    password: string;

    @Prop({required: true, type: [String], default: ['user']})
    roles: string[];

    @Prop({ required: true, type: [String], default: [] })
    ips: string[];

    @Prop({ required: true, type: [TodoSchemas], default: [] })
    todos: Todo[];

}

export const UserSchemas = SchemaFactory.createForClass(User);