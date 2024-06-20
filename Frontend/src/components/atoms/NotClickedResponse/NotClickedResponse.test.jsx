import { render } from "@testing-library/react";
import { NotClickedResponse } from "./NotClickedResponse";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/Auth/AuthProvider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../assets/styles/theme";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

describe('Test in <NotClickedResponse/>', () => { 
    test('Container must render and match snapshot', () => { 
        
        const {container} = render(
            <BrowserRouter>
                <AuthProvider>
                        <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18next}>
                            <NotClickedResponse/>    
                        </I18nextProvider>
                        </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
     })
 })