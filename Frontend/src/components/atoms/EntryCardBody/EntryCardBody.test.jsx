import { ThemeProvider } from "@emotion/react"
import { BrowserRouter } from "react-router-dom"
import { theme } from "../../../assets/styles/theme"
import { EntryCardBody } from "./EntryCardBody"
import { I18nextProvider } from "react-i18next"
import i18next from "i18next"
import { render } from "@testing-library/react"

describe('Test in <EntryCardBody/>', () => { 
    test('Container must render and match snapshot', () => { 
        const {container} = render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <I18nextProvider i18n={i18next}>
                        <EntryCardBody/>
                    </I18nextProvider>
                </ThemeProvider>
            </BrowserRouter>
        )

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
     })
 })