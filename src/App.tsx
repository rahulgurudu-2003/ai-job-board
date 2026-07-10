import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";
import { setAuthErrorCallback } from "./services/authApi";
import { logoutState } from "./store/auth/authSlice";


setAuthErrorCallback(() => {
  store.dispatch(logoutState());
});

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </Provider>
  );
}

export default App;