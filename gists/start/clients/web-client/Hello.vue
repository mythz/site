@Component
export class HelloApi extends Vue {
    @Prop() public name: string;
    public txtName: string = '';
    public result: string = '';

    public mounted() {
        this.nameChanged(this.name);
    }

    @Watch('txtName')
    public onNameChanged(value: string, oldValue: string) {
        this.nameChanged(value);
    }

    public async nameChanged(name: string) {
        if (name) {
            const r = await client.get(new Hello({ name }));
            this.result = r.result;
        } else {
            this.result = '';
        }
    }
}