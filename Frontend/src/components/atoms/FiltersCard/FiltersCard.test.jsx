import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/Auth/AuthProvider";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../assets/styles/theme";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { FiltersCard } from "./FiltersCard";

describe('Test in <FiltersCard/>', () => { 

    const mockLoadImage = jest.fn();

    test('Container must render and match snapshot', () => { 
        mockLoadImage.mockReturnValue('');
        const {container} = render(
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                    <I18nextProvider i18n={i18next}>
                        <FiltersCard loadImage={mockLoadImage}/>    
                    </I18nextProvider>
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
     })
})