export type Note = {
  readonly id: string;
  readonly creatorId: string;
  readonly author: string;
  readonly created: Date | string;
  readonly text: string;
};
