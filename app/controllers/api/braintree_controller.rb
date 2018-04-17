class Api::BraintreeController < ApplicationController
  def token
    rener json: ENV['BRAINTREE_DROPIN_TOKEN']
  end

  def payment
  end
end
