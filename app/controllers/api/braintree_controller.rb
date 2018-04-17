class Api::BraintreeController < ApplicationController
  def token
    rener json: ENV['BRAINTREE_DROPIN_TOKEN']
  end

  def payment
    result = Braintree::Transation.sale(
      amount: params[:amount],
      payment_method_nonce: params[:nonce],
      options: {
        submit_for_selttlement: true
      }
    )

    if result.success? 
      render json: result.transation.id 
    elsif result.transaction
      text = "text: #{result.transatoin.processor_response_text}"
      code = "code: #{result.transaction.processor_response_text}"
      render json: {errors: { text: text, code: code }}
    else 
      render json: {errors: result.errors }
    end 
  end
end
