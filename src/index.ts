interface LoadingState {
  type: "loading";
  data: string[];
}
interface ErrorState {
  type: "error";
  message: string;
}

type FetchStatus = LoadingState | ErrorState;

// type statusType = "loading" | "error"
type statusType = FetchStatus["type"];
