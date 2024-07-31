import { AdminLayout } from './AdminLayout'
import { Plugin } from '@/application'

class AdminLayoutPlugin extends Plugin {
    async load() {
        this.app.use(AdminLayout)
    }
}

export default AdminLayoutPlugin
