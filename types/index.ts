import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type Opaque<T, K extends string> = T & { __typename: K }

type Base64 = Opaque<string, "base64">

export type IOrder = {
  id: number;
  type: string;
  name: string;
  email: string;
  description: string;
  ownerId: number;
  reviewer: string;
  reviewDate: string;
  reviewerSubmissionDate: string;
  receptionDate: string;
  review: string;
  pdf_base64: string
} & IOrderStatus;

export type IOrderStatus = {
  status:
    | "Solicitado"
    | "Esperando Parecer"
    | "Solicitado Revisão"
    | "Parecer Recusado"
    | "Parecer Aceito"
    | "Concluído Aprovado"
    | "Concluído Recusado";
};

export type IUser = {
  id: number;
  name: string;
  password: string;
  role: "coordinator" | "reviewer" | "secretary" | "applicant";
};
