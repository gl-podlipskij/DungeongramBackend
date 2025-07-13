import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface UserCreationAttributes {
  email: string;
  nickname: string;
  password: string;
}

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 128 })
  nickname: string;

  @Column({ type: "varchar", length: 128 })
  password: string;
}

export default User;
