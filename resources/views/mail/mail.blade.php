<table style="table-layout:fixed;background-color:#F9F9F9;" id="bodyTable" width="100%" cellspacing="0" cellpadding="0" border="0">
	<tbody><tr>
		<td style="padding-right:10px;padding-left:10px;" id="bodyCell" valign="top" align="center">
		<table style="max-width:600px;" class="wrapperWebview" width="100%" cellspacing="0" cellpadding="0" border="0">
			<tbody><tr>
				<td valign="top" align="center">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody><tr>
							<td style="padding-top: 40px; padding-bottom: 40px;" class="emailLogo" valign="middle" align="center">
								<a href="{{ env('APP_URL') }}" target="_blank" style="text-decoration:none;">
									<img src="{{ env('APP_URL') }}/images/logo/email_logo.png" alt="" style="width:100%; max-width:150px;height:auto; display:block;" width="150" border="0">
								</a>
							</td>
						</tr>
					</tbody></table>
				</td>
			</tr>
		</tbody></table>
		<table style="max-width:600px;" class="wrapperBody" width="100%" cellspacing="0" cellpadding="0" border="0">
			<tbody><tr>
				<td valign="top" align="center">
					<table style="background-color:#FFFFFF;border-color:#E5E5E5; border-style:solid; border-width:0 1px 1px 1px;" class="tableCard" width="100%" cellspacing="0" cellpadding="0" border="0">

						<tbody><tr>
							<td style="background-color:#003CE5;font-size:1px;line-height:3px;" class="topBorder" height="3">&nbsp;</td>
						</tr>

						<tr>
							<td style="padding-bottom: 20px;" class="imgHero" valign="top" align="center">
								<a href="{{ env('APP_URL') }}" target="_blank" style="text-decoration:none;" class="">
									<img src="{{ env('APP_URL') }}/images/mail/{{ $image }}" alt="" style="width:100%; max-width:600px; height:auto; display:block;" class="" width="600" border="0">
								</a>
							</td>
						</tr>

						<tr>
							<td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" class="mainTitle" valign="top" align="center">
								<h2 class="text" style="color:#000000; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:28px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:36px; text-transform:none; text-align:center; padding:0; margin:0">
									{!! $headline !!}
								</h2>
							</td>
						</tr>

						<tr>
							<td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" class="subTitle" valign="top" align="center">
								<h4 class="text" style="color:#999999; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:16px; font-weight:500; font-style:normal; letter-spacing:normal; line-height:24px; text-transform:none; text-align:center; padding:0; margin:0">
									{!! $subtitle !!}
								</h4>
							</td>
						</tr>

						<tr>
							<td style="padding-left:20px;padding-right:20px;" class="containtTable ui-sortable" valign="top" align="center">

								<table class="tableDescription" style="" width="100%" cellspacing="0" cellpadding="0" border="0">
									<tbody><tr>
										<td style="padding-bottom: 20px;" class="description" valign="top" align="center">
											<p class="text" style="color:#666666; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:14px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:22px; text-transform:none; text-align:center; padding:0; margin:0">
												{!! $text !!}
											</p>
										</td>
									</tr>
								</tbody></table>

								@if(!empty($button_text))
								<table class="tableButton" style="" width="100%" cellspacing="0" cellpadding="0" border="0">
									<tbody><tr>
										<td style="padding-top:20px;padding-bottom:20px;" valign="top" align="center">
											<table cellspacing="0" cellpadding="0" border="0" align="center">
												<tbody><tr>
													<td class="ctaButton" style="background-color: rgb(0, 60, 229); padding: 12px 35px; border-radius: 50px;" align="center">
														<a class="text" href="{{ $button_link }}" target="_blank" style="color:#FFFFFF; font-family:'Poppins', Helvetica, Arial, sans-serif; font-size:13px; font-weight:600; font-style:normal;letter-spacing:1px; line-height:20px; text-transform:uppercase; text-decoration:none; display:block">
															{{ $button_text }}
														</a>
													</td>
												</tr>
											</tbody></table>
										</td>
									</tr>
								</tbody></table>
								@endif
							</td>
						</tr>

						<tr>
							<td style="font-size:1px;line-height:1px;" height="20">&nbsp;</td>
						</tr>

						<tr><td style="padding-bottom: 40px;" class="emailRegards" valign="middle" align="center">
                        <a href="{{ env('APP_URL') }}" target="_blank" style="text-decoration:none;">
                            <img src="{{ env('APP_URL') }}/images/logo/bottom_text_mail.png" alt="" style="width:100%;max-width:150px; height:auto; display:block;" width="150" border="0">
                        </a>
                    </td>
</tr>
					</tbody></table>
					<table class="space" width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody><tr>
							<td style="font-size:1px;line-height:1px;" height="30">&nbsp;</td>
						</tr>
					</tbody></table>
				</td>
			</tr>
		</tbody></table>
		<table style="max-width:600px;" class="wrapperFooter" width="100%" cellspacing="0" cellpadding="0" border="0">
			<tbody><tr>
				<td valign="top" align="center">
					<table class="footer" width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>

						<tr>
							<td style="padding: 10px 10px 5px;" class="brandInfo" valign="top" align="center">
								<p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">{{ env('APP_NAME') }} 2020
								</p>
							</td>
						</tr>

						<tr>
							<td style="padding: 0px 10px 20px;" class="footerLinks" valign="top" align="center">
								<p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
									<a href="{{ env('APP_URL') }}" style="color:#777777;text-decoration:underline;" target="_blank">Перейти на сайт </a>&nbsp;|&nbsp;<a href="{{ env('APP_URL') }}" style="color:#777777;text-decoration:underline;" target="_blank">Перейти в личный кабинет </a>
								</p>
							</td>
						</tr>

						<tr>
							<td style="padding: 0px 10px 10px;" class="footerEmailInfo" valign="top" align="center">
								<p class="text" style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
									Если у вас есть какие-либо вопросы, пожалуйста, свяжитесь с нами <a href="mailto:{{ env('MAIL_USERNAME') }}" style="color:#777777;text-decoration:underline;" target="_blank">{{ env('MAIL_USERNAME') }}.</a>
								</p>
							</td>
						</tr>
						<tr>
							<td style="font-size:1px;line-height:1px;" height="30">&nbsp;</td>
						</tr>
					</tbody></table>
				</td>
			</tr>
			<tr>
				<td style="font-size:1px;line-height:1px;" height="30">&nbsp;</td>
			</tr>
		</tbody></table>
		</td>
	</tr>
</tbody></table>
