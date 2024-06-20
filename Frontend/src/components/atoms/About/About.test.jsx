import { render } from "@testing-library/react"
import { About } from "./About"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../../assets/styles/theme"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../../../contexts/Auth/AuthProvider"
import { I18nextProvider } from "react-i18next"
import i18next from "i18next"

describe('Test in <About/>', () => {

    test('Component must render and match snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <AuthProvider>

                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18next}>
                            <About />
                        </I18nextProvider>
                    </ThemeProvider>

                </AuthProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
    })

})