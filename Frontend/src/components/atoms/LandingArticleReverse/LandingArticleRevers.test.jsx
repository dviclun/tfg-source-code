import { BrowserRouter } from "react-router-dom";
import { LandingArticleReverse } from "./LandingArticleReverse";
import { AuthProvider } from "../../../contexts/Auth/AuthProvider";
import { ParallaxProvider } from "react-scroll-parallax";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../assets/styles/theme";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { render } from "@testing-library/react";

describe('Test in <LandingArticleReverse/>', () => { 
    test('Container must render and match snapshot', () => { 
        
        const {container} = render(
            <BrowserRouter>
                <AuthProvider>
                    <ParallaxProvider>
                        <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18next}>
                            <LandingArticleReverse/>    
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