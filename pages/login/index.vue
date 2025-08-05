<template>
	<view class="bg-login">
        <z-paging ref="paging" :auto="false" :refresher-enabled="false" :loading-more-enabled="false">
			<view class="u-px-50" style="padding-top: 990rpx;">
				<u-button
				text="手机号快捷登录" 
				shape="circle" 
				color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
				openType="getPhoneNumber"
				@getphonenumber="login"></u-button>
			</view>
			<template #bottom>
				<view class="u-p-50 flex flex-center">
					<view style="width: 32rpx;height: 32rpx;" @tap="isSelect = !isSelect">
						<u--image :src="$fullLink('icon-checked.png')" width="32rpx"  height="32rpx" v-if="isSelect"></u--image>
						<view style="width: 32rpx;height: 32rpx;border-radius: 50%;border: 1rpx solid #999999;" v-else></view>
					</view>
					<view class="flex align-center flex-row c-999 u-font-24 font-400 u-m-l-12">
						<span>我已阅读并同意羔羊登记</span>
						<span class="c-0289ff" @tap="agreement('serve')">《服务协议》</span>、
						<span class="c-0289ff" @tap="agreement('privacy')">《隐私协议》</span>
					</view>
				</view>
			</template>
		</z-paging>
		<u-popup :show="popupShow" @close="popupShow = false" mode="center" :safeAreaInsetBottom="false" round="20">
		    <view class="u-p-32" style="width: 546rpx;height: 954rpx;">
		        <view class="u-font-32 c-333 flex flex-center u-m-b-30">
		        	{{agreementTitle}}
		        </view>
				<view class="u-m-b-30" style="overflow-y:auto;height: 710rpx;">
					<u-parse :content="agreementContent"></u-parse>
				</view>
				<view class="flex flex-between relative" style="box-shadow: 0 -60rpx 60rpx 20rpx #ffffff;z-index: 10;">
					<view style="width: 216rpx;">
						<u-button text="取消" shape="circle" @click="popupShow = false"></u-button>
					</view>
					<view style="width: 216rpx;">
						<u-button 
						text="确定" 
						shape="circle" 
						color="linear-gradient(to right,#aee96d,#a2e37c,#96de88,#8fda90)"
						@click="affirm"></u-button>
					</view>
				</view>
		    </view>
		</u-popup>
	</view>
</template>

<script>
	import {postStationLogin} from '@/common/request/api/login.js'
	export default{
		data(){
			return{
				isSelect:false,
				popupShow:false,
				agreementTitle:'羔羊登记《服务协议》',
				agreementContent:'<p><br></p><p style=\"text-align: left;\"><strong>《洁小兔平台》用户服务协议</strong></p><p style=\"text-align: start;\"><strong>最新版本生效日期：2023年6月8日</strong></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">特别提示：</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">杭州洁兔智能科技有限公司（旗下“洁小兔”品牌）在此特别提醒，用户欲访问和使用本平台、接受本平台提供的服务，必须事先认真阅读本服务协议中各条款，特别是与您的权益有重大关系的涉及免除或限制责任的条款、争议解决条款以及法律适用条款（在本协议中，我们将用黑体字等方式向您做显著提示），如您对本协议内容有任何疑问，可与本平台客服或公示邮箱进行联系。</span></p><p style=\"text-align: start;\"><strong>【审慎阅读】</strong><span style=\"color: rgb(51, 51, 51); font-size: 12px;\"><strong>您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向洁小兔平台客服咨询。</strong></span></p><p style=\"text-align: start;\"><strong>【签约动作】</strong><span style=\"color: rgb(51, 51, 51); font-size: 12px;\"><strong>当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与洁小兔达成一致，成为洁小兔平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</strong></span></p><p style=\"text-align: start;\"><strong>一、基本条款</strong></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">1.1 您正在阅读的法律文件为您（或称为“用户”或“买方”或“卖方”）和平台的经营者即杭州洁兔智能科技有限公司之间的协议。本协议仅在您和我们之间成立。洁小兔平台的经营者是指法律认可的经营线上电子商务的责任主体。有关洁小兔平台经营者的信息请查看杭州洁兔智能科技有限公司官网首页底部公布的公司信息和证照信息。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">1.2 请认真阅读本协议。您浏览、访问或使用本平台或使用本平台提供的任何设施或服务或通过本平台上进行任何交易，即表明您同意本协议条款（“协议”）。本平台产生的服务和发生的任何交易行为，均默认需遵守本协议规定的全部条款。我们保留随时修改这些协议条款的权利，任何修改均会及时在本平台公示。 如果您继续使用本平台，均将被视为默认接受新协议条款；若您不同意相关协议条款变更，应当立即停止使用洁小兔平台提供的任何服务。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">1.3 本协议内容包括协议正文、隐私保护声明、免责声明及所有洁小兔平台已经发布或将来可能发布的各类规则、公告或通知（以下合称“规则”）所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">1.4 本协议自注册完成洁小兔平台并获得相应登录账号及密码后立即生效，有效服务日期为注册账号成功后的3年内有效；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">1.5 本平台提供的任何服务，均仅针对从中国境内访问本平台的用户；您不得篡改本平台及攻击本主体平台。我们将依据适用法律保留阻止您使用平台和服务的权利。</span></p><p style=\"text-align: start;\"><strong>二、注册及账户</strong></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">2.1 您确认，在您完成注册程序或以其他洁小兔平台允许的方式实际使用平台服务时，您应当是具备</span><span style=\"color: rgb(51, 51, 51); background-color: white; font-size: 12px;\">中华人民共和国法律规定的</span><span style=\"color: rgb(82, 82, 82); background-color: white;\">完全民事行为能力的自然人、法人或其他组织。若您不具备</span><strong>前述与您行为相适应的民事行为能力</strong><span style=\"color: rgb(82, 82, 82); background-color: white;\">，则您及您的监护人应承担因此而导致的一切后果，洁小兔平台有权注销或永久冻结您的账户，并向您及您的监护人索偿相应损失。</span><strong>此外，您还需确保您不是任何国家、地区或国际组织实施的贸易限制、经济制裁或其他法律法规限制的对象，也未直接或间接为前述对象提供资金、商品或服务，否则您应当停止使用洁小兔平台服务，同时，您理解违反前述要求可能会造成您无法正常注册及使用洁小兔平台服务。</strong></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">2.2 您在注册后可通过本平台进行交易，目前您可以免费注册和使用洁小兔平台账户，但我们保留将来要求您支付相应管理费用的权利（自洁小兔平台官方公布之日起）。注册时，您需要</span><span style=\"color: rgb(51, 51, 51); background-color: white; font-size: 12px;\">准确完整</span><span style=\"color: rgb(82, 82, 82); background-color: white;\">向我们提供您的姓名、地址、有效证件号及其他信息，</span><strong>您了解并同意，您有义务保持您提供信息的真实性及有效性。</strong><span style=\"color: rgb(82, 82, 82); background-color: white;\">我们会妥善保存您的信息，请参见我们的用户隐私政策。我们保留依法随时拒绝新注册或取消账户的权利。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">2.3 您需要确保您在注册时所提供的信息以及账户包含的信息在本协议有效期内均真实、完整和准确，且及时把更新及变更情况通知我们。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，洁小兔平台有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供的部分或全部服务且洁小兔平台对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。因通过您提供的联系方式无法与您取得联系，导致您在使用洁小兔平台服务过程中产生任何损失或增加费用的，由您完全独自承担。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">2.4 在安全完成本平台的注册程序并获得一个密码及账号后，您有义务维持密码及账号的机密安全。您应对任何人利用您的密码及账号所进行的活动负完全责任，本公司无法对非法或未经您授权使用您账号及密码的行为作出甄别，因此本公司不承担任何责任。在此，您同意并承诺做到：</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(1）您必须对密码妥善保管，当您的密码或账号遭到未获授权的使用，或者发生其他任何安全问题时，您会立即采取有效途径通知到洁小兔平台；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(2）若您向任何人披露用户名及密码之后，该人即获得授权，以您代理人的身份使用服务和平台（及/或通过平台进行交易）。请注意，若出于您的原因致使密码泄露，您需自行承担相应的责任。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">2.5 如果发现任何用户使用代理 IP 地址、企图掩盖其使用多个注册账户，或如果任何非中国用户冒充中国用户，或以任何方式</span><span style=\"color: black; background-color: white;\">干扰本平台或服务，我们有保留关闭其账户的权利；如果出于破坏某个群体或干扰其他用户的目的而使用多点登录，我们可能针对您的所有账户采取行动。</span></p><p style=\"text-align: start;\"><strong>三、服务内容</strong></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">洁小兔平台可运用自身开发的软件系统为本平台使用用户提供衣物洗护、商品购买等服务，具体服务内容由本平台依据实际情况提供，包括但不限于：</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(1）衣物洗护、鞋类、奢侈品养护服务；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(2）第三方物流平台预约取/送件服务；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(3）家政、保洁、维修等到家服务的线上预约、分配；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(4）商城购物以及与购物相关的订单处理、物流查询、退款退货等流程服务；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(5）虚拟货币如红包、积分、优惠券等平台虚拟交易服务；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(6）合作客户（包括但不限于机构、个人等）收入结算和佣金费用支付等服务；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(7）未来本平台可能提供的其他服务。</span></p><p style=\"text-align: start;\"><strong>四、支付/退款：</strong></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(1）请您务必按自己的需求选取相应的支付选项，并按该支付渠道相应的页面提示完成支付程序；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(2）本平台仅提供支付渠道的链接，并未提供或参与提供任何支付功能。平台并不承担您在支付渠道支付而产生的任何损失。您与支付渠道提供商之间的任何争议与平台无关，您应当自行与各支付渠道提供商沟通解决；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">(3）本平台账号消费服务有效期自用户成功支付平台款项之日起计算，平台本身不提供退款，如您在使用过程中因特殊原因要进行退款服务，需提供第三方支付账号并参照以下退款规定：</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">1、在使用上述支付渠道支付时，您务必确认消费为自己的账号并仔细选择相关操作选项。若因为您自身输入账号错误、操作不当或不了解支付计费方式等因素造成支付错账号、错选种类等情形而遭受任何损失的，本平台将不作任何补偿或赔偿；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">2、若您以非法的方式，或使用非正常支付渠道进行支付，本平台不保证该支付顺利或正确完成。若因此造成您权益受损，本平台不会作任何补偿或赔偿，同时本平台保留关闭您账号并停止为您提供各项服务的权利。</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">3、若您因个人原因需对支付费用退回，平台将扣除包括但不限于赠款权益、优惠券权益、积分权益等权益后将退于您第三方账户内，您需提供您交易支付凭证（包括但不限于银行回单、其他第三方交易平台认可的交易凭证）。</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">4、若您在平台内存在收益权益需对账户金额进行提现，平台将扣除6% -12%（国家政策规定免税的除外）区间的税率后将提现金额转账至您所提供的第三方账户内，您需提供您交易支付凭证（包括但不限于银行回单、其他第三方交易平台认可的交易凭证），提现到账日期为20个工作日内；</span></p><p style=\"text-align: start;\"><span style=\"color: black; background-color: white;\">5、如您未能准确提供您交易支付凭证（包括但不限于银行回单、其他第三方交易平台认可的交易凭证）或您未在本平台发生交易记录（本平台未能查询、检索到您的交易信息），则本平台不提供退款服务。</span></p><p style=\"text-align: start;\"><strong>五、平台使用规则</strong></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">5.1 您承诺不使用或允许任何其他人使用我们提供的服务或本平台从事如下活动（但不限于）: 发送或接收任何违法、违规、违反公德良俗、侵害干扰他人权益、存在技术危害或未经我们或第三方许可和/或批准的任何材料；截取或试图截取通过电信系统传送的任何信息；将其用于我们预定目的之外的其他目的；构成或诱发可能被视为违法、犯罪或以其他方式违法违规或侵犯任何第三方权利的行为；或其他不符合普遍认可的有关互联网及其他网络的通常做法。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">5.2 您承诺不以下列方式使用我们提供的服务或本平台（但不限于）: 欺诈；提供虚假信息；企图规避我们的安全设置或网络系统；使用任何装置、软件或例行程序干预或试图干预洁小兔平台的正常运作或正在洁小兔平台上进行的任何交易、活动；使我们的计算机系统或设施承受不合理负载或从事可能导致此类情况出现的行动；以不合法的方式获取我们提供的服务或平台信息；实施任何形式的网络监控，从而截取与您无关的信息；未经他人同意发送信息；未经授权使用或伪造他人信息；撰写、发送或转发恶意信息，或任何类型的传销材料（无论接收人是否愿意接收此类信息）；从事任何非法活动； 从事任何我们认为会限制或妨害任何其他客户正常使用平台和接受我们服务的行为；对洁小兔平台上的任何数据作商业性利用，包括但不限于在未经洁小兔平台事先书面同意的情况下，以复制、传播等任何方式使用平台上展示的资料、咨询等；违反本协议规定。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">5.3 您了解并同意：</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(1）您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，洁小兔平台有权向您追偿由此产生的任何损失或增加费用；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(2）基于维护洁小兔平台交易秩序及交易安全的需要，洁小兔平台有权在发生恶意购买等扰乱市场正常交易秩序的情形下，执行强制关闭相应交易订单等操作；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(3）经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为，或者洁小兔平台根据自身的判断，认为您的行为涉嫌违反法律法规的规定或涉嫌违反本协议和/或规则的条款的，则有权在平台上公示您的该等涉嫌违法或违约行为并立即对您采取措施；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(4）对于我们认为可能引起违反本协议的任何材料，我们有权在不通知您的情况下立即对其屏蔽、编辑或清除；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(5）对于您违反本协议项下承诺，或您对洁小兔平台上实施的行为，包括您未在洁小兔程序上实施但已经对其他用户产生影响的行为，洁小兔平台有权单方认定您行为的性质是否构成对本协议和/或规则的违反，并根据单方认定结果予以处理或终止向您提供服务，且无须征得您的同意或提前通知予您。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(6）如您涉嫌违反有关法律或者本协议之规定，使洁小兔平台遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您需赔偿因此造成的损失和/或发生的费用，包括由此产生的律师费用。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">5.4 若洁小兔平台一旦得知出现任何错误或疏漏，我们将在第一时间尽最大努力尽快予以纠正。但是，我们不能保证服务或本平台不会出错，且如果适用法律没有相反的规定，我们将不为该等错误或疏漏承担责任。如果出现错误或疏漏，请您立即通过电话向我们报告，官方客服电话：400-8558-270。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">5.5 尽管我们将努力为您提供不受干扰的服务和平台，但服务的提供和平台的访问可能会意外中止、受限或终止。我们不能保证您接收我们提供的服务或使用本平台不会受到任何干扰；不能保证通过本平台传送的任何信息均能准确、可靠、及时地传送；不能保证本平台没有感染第三方植入的病毒或其他恶意程序。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">5.6 我们有权未经通知而随时变更、修改、替换、中止或移除任何信息或服务产品或我们通过本平台提供的服务。您访问本平台和/或接受服务可能还会因维修、维护或安装新设施或引入新服务而受到限制。我们将尽快恢复您的访问。我们不对您的浏览器或其他第三方软件运行功能承担责任（包括但不限于RSS源）。</span></p><p style=\"text-align: start;\"><strong>六、协议中止、终止</strong></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">6.1 我们有权保留不经事先通知随时全部或部分的：</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(1）中止服务的提供和/或本平台的使用权；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(2）暂停您使用服务和/或本平台的权利；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(3）暂停任何我们相信与您有关（无论以何种方式）的任何人使用服务和/或本平台的权利；</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(4）并在下列情况下立即终止本协议（包括但不限于）的权利：</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">您违反本协议规定；我们有合理理由怀疑您已经、可能或将要违反本协议条款；或我们有合理理由怀疑您可能已经或正在对我们或第三方实施欺骗。我们终止本协议的权利不应妨害我们可能拥有的基本协议终止前因您违反本协议或我们本应享有的任何其他权利或救济。同时我们将应相关政府部门的要求并与其全面合作，确认违反本协议的任何人的身份并进行披露。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">不论因何种理由，我们中止/终止您全部或部分使用服务、访问本平台和/或购买服务/产品的权利后，均无须为此向您或任何第三方承担任何责任。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">6.2、您同意，您与洁小兔平台的合同关系终止后，洁小兔平台仍享有下列权利：</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(1）继续保存您的用户信息及您使用服务期间的所有交易信息。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(82, 82, 82); background-color: white;\">(2）您在使用服务期间存在违法行为或违反本协议和/或规则的行为的，洁小兔平台仍可依据本协议向您主张权利。</span></p>"'
			}
		},
		methods:{
			login(e){
				if(!this.isSelect) return uni.$u.toast('请阅读并同意羔羊登记《服务协议》、《隐私协议》')
				uni.login({
					provider: 'weixin',
					success: (val)=>{
						let data = {
							code:e.detail.code,
							authCode:val.code,
						}
						console.log(data)
						postStationLogin(data).then(res=>{
							uni.setStorageSync('token',res.data.token)
							uni.setStorageSync('userInfo',res.data)
							uni.switchTab({
								url:'/pages/tabbar/home/index'
							})
						})
					}
				})
			},
			agreement(type){
				if(type == 'serve'){
					this.agreementTitle = '羔羊登记《服务协议》'
				}else{
					this.agreementTitle = '羔羊登记《隐私协议》'
				}
				this.popupShow = true
			},
			affirm(){
				this.popupShow = false
				this.isSelect = true
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg-login{
		width: 100vw;
		height: 100vh;
		background: url('https://env-00jxtkgouyh5.normal.cloudstatic.cn/lcApp/bg-login.png') 0 0 no-repeat;
		background-size: cover;
	}
</style>