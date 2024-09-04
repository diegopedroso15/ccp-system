import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

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
