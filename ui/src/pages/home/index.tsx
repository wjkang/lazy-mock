import * as React from 'react'
import './css.scss'
import ReleaseLogApi from '../../api/ReleaseLog.Api'

interface Bot {
	key: string
	label: string
	value: string
	description: string
}

interface State {
	bot: string
	title: string
	version: string
	link: string
	description: string
}

const bots: Bot[] = [
	{
		label: '测试',
		value: '测试',
		description: '',
		key: '7f20f166-3f08-4636-88c7-08027bc0c712'
	},
	{
		label: 'CS_Zhuzher(住这儿App)',
		value: 'CS_Zhuzher(住这儿App)',
		description: '住这儿App发布',
		key: 'a7b836fd-b34f-4eb1-98f9-3f2c6ca57a54'
	},
	{
		label: 'CS_Zhuyingtai(助英台App)',
		value: 'CS_Zhuyingtai(助英台App)',
		description: '助英台App发布',
		key: '7f20f166-3f08-4636-88c7-08027bc0c712'
	},
	{
		label: 'CS_Blackpearl(友邻市集)',
		value: 'CS_Blackpearl(友邻市集)',
		description: '友邻市集版本更新',
		key: '4a323dd0-7e81-4ec9-a550-51f42ee65266'
	},
	{
		label: 'CS_Hulk(自营装修系统)',
		value: 'CS_Hulk(自营装修系统)',
		description: '自营装修版本发布',
		key: 'db4fd550-7a79-4ab2-a12a-55157f304644'
	},
	{
		label: 'CS_Blackbeard(平台装修系统)',
		value: 'CS_Blackbeard(平台装修系统)',
		description: '平台装修版本发布',
		key: 'd6da2812-5d5d-4731-acba-9860a0c29b00'
	},
	{
		label: 'CS_MobyDick（物业SaaS系统）',
		value: 'CS_MobyDick（物业SaaS系统）',
		description: '基础物业服务版本发布',
		key: '2a900803-df10-40e7-82fb-90ebf725764e'
	},
	{
		label: 'CS_MiniProgram（微信小程序）',
		value: 'CS_MiniProgram（微信小程序）',
		description: '微信小程序版本发布',
		key: '4fc22f4d-e8ff-4228-9080-c854ecf71fb6'
	},
	{
		label: 'CS_TheAvengers（商业开放平台）',
		value: 'CS_TheAvengers（商业开放平台）',
		description: '商业开放平台发布',
		key: 'f3751a65-810f-4f5c-a4d3-5a7ed9925806'
	},
	{
		label: 'CS_Lease(租售系统)',
		value: 'CS_Lease(租售系统)',
		description: '朴邻租售版本发布',
		key: '04eda8ef-bda5-4c87-b27f-a85a2833e415'
	},
	{
		label: 'CS_RisingSun（社区服务）',
		value: 'CS_RisingSun（社区服务）',
		description: '社区服务版本发布',
		key: '8335b6a5-5be5-4a20-884b-02d15410064a'
	}
]
console.log(process.env.NODE_ENV)

class Home extends React.Component<{}, State> {
	constructor(props: any) {
		super(props)
		this.state = {
			bot: '测试',
			title: '',
			version: '',
			link: '',
			description: ''
		}
	}
	private selectBot(e: React.ChangeEvent<HTMLSelectElement>) {
		const bot = bots.find(s => s.value === e.target.value)
		this.setState({
			bot: e.target.value,
			title: bot.description
		})
	}
	private titleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			title: e.target.value
		})
	}
	private versionChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			version: e.target.value
		})
	}
	private linkChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			link: e.target.value
		})
	}
	private descriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({
			description: e.target.value
		})
	}
	private canSubmit() {
		if (this.state.title.trim() === '') {
			return false
		}
		return true
	}
	private submit() {
		if (!this.canSubmit()) {
			return
		}
		const bot = bots.find(s => s.value === this.state.bot)
		new ReleaseLogApi()
			.sendMessage({
				...this.state,
				key: bot.key
			})
			.then(() => {
				alert('发送成功！')
				this.setState({
					bot: '',
					title: '',
					version: '',
					link: '',
					description: ''
				})
			})
	}
	public render() {
		const botOptions = bots.map(bot => {
			return (
				<option value={bot.value} key={bot.value}>
					{bot.label}
				</option>
			)
		})
		return (
			<div className="home pure-u-1-1 pure-u-lg-1-4 pure-u-sm-3-4">
				<div className="title">CS 发版</div>
				<div>
					<form className="pure-form pure-form-stacked">
						<div className="pure-g">
							<div className="pure-u-1">
								<label>请选择机器人</label>
								<select
									className="pure-u-1"
									value={this.state.bot}
									onChange={e => {
										this.selectBot(e)
									}}>
									{botOptions}
								</select>
							</div>
							<div className="pure-u-1">
								<label>请输入发版标题</label>
								<input
									className="pure-u-1"
									type="text"
									value={this.state.title}
									onChange={e => {
										this.titleChange(e)
									}}
								/>
							</div>
							<div className="pure-u-1">
								<label>请输入发版版本号</label>
								<input
									className="pure-u-1"
									type="text"
									value={this.state.version}
									onChange={e => {
										this.versionChange(e)
									}}
								/>
							</div>
							<div className="pure-u-1">
								<label>请输入迭代详情链接</label>
								<input
									className="pure-u-1"
									type="text"
									value={this.state.link}
									onChange={e => {
										this.linkChange(e)
									}}
								/>
							</div>
							<div className="pure-u-1">
								<label>请输入发版内容</label>
								<textarea
									className="pure-u-1"
									value={this.state.description}
									onChange={e => {
										this.descriptionChange(e)
									}}
								/>
							</div>
							<div className="pure-u-1">
								<button
									type="button"
									className={[
										'pure-button pure-u-1',
										this.canSubmit()
											? 'button-warning'
											: 'pure-button-disabled'
									].join(' ')}
									onClick={() => {
										this.submit()
									}}>
									确认无误，发送吧
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Home
