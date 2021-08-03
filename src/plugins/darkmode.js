/**
 * FlyingSky's Home
 * Dark Mode
 * 
 * @author FlyingSky-CN
 * @link https://github.com/FlyingSky-CN/MDr/blob/master/darkmode.js
 * @link https://blog.skk.moe/post/hello-darkmode-my-old-friend
 * @link https://blog.fsky7.com/archives/46
 */

const setLocalValue = (name, value) => localStorage.setItem(name, value)
const getLocalValue = (name) => { const value = localStorage.getItem(name); return value ? value : null }

export default function (vue) {

    /**On DarkMode */
    const onDarkMode = () => {
        console.log('[Dark mode]', true)
        vue.$vuetify.theme.dark = true
        setLocalValue('dark', true)
    }

    /**Off Darkmode */
    const offDarkMode = () => {
        console.log('[Dark mode]', false);
        vue.$vuetify.theme.dark = false
        setLocalValue('dark', false)
    }

    /**应用模式 */
    const applyDarkMode = (mode) => mode ? onDarkMode() : offDarkMode()

    /**
     * 从 CSS 媒体查询获取
     * 是否为 Dark Mode
     */
    const getDarkModeFromCSSMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false

    /**
     * 从 LocalStorage 媒体查询获取
     * 是否为 Dark Mode
     */
    const getDarkModeFromLocalStorage = () => getLocalValue('dark')

    /**初始化 DarkMode */
    const initDarkMode = () => {
        var system = getDarkModeFromCSSMediaQuery(),
            local = getDarkModeFromLocalStorage();
        applyDarkMode(null === local ? system : local == "true")
    }

    vue.applyDarkMode = applyDarkMode

    initDarkMode()
}