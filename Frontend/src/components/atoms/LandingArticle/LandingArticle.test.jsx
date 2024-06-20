import { render } from "@testing-library/react";
import { LandingArticle } from "./LandingArticle";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/Auth/AuthProvider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../assets/styles/theme";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { ParallaxProvider } from "react-scroll-parallax";

describe('Test in <LandingArticle/>', () => { 
    test('Container must render and match snapshot', () => { 
        
        const {container} = render(
            <BrowserRouter>
                <AuthProvider>
                    <ParallaxProvider>
                        <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18next}>
                            <LandingArticle/>    
                        </I18nextProvider>
                        </ThemeProvider>
                    </ParallaxProvider>
                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
     })
 })