export type actionType = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
