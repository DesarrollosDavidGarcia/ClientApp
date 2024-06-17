export class ResultVM<T> {
  code: number;
	message: string;
	icon: string;
	data: T;
	isSuccess: boolean;
	errors: string[];
}
