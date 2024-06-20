import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/Auth/AuthProvider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../assets/styles/theme";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { SvgLogo } from "./SvgLogo";

describe('Test in <SvgLogo/>', () => { 
    test('Container must render and match snapshot', () => { 
        
        const {container} = render(
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18next}>
                            <SvgLogo/>    
                        </I18nextProvider>
                        </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
     })
 })