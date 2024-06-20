import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/Auth/AuthProvider";
import { SnackbarProvider } from "../../../contexts/Snackbar/SnackbarProvider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../assets/styles/theme";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { AddVideoForm } from "./AddVideoForm";

describe('Test in <AddVideoForm/>', () => {
    test('Container must render and match snapshot', () => {

        const { container } = render(
            <BrowserRouter>
                <AuthProvider>
                    <SnackbarProvider>
                        <ThemeProvider theme={theme}>
                            <I18nextProvider i18n={i18next}>
                                <AddVideoForm />
                            </I18nextProvider>
                        </ThemeProvider>
                    </SnackbarProvider>
                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
    })
})