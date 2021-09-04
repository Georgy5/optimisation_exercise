# Here you can find some rather mysterious method defined on User model
# (again - don't worry this code doesn't live in the wild, at least anymore)
#
# You don't know the internals or how those methods are being used but can you noticed
# some more or less obvious issues with this code?
#
# Let's prepare a secret gist with alternative approach and your thoughts about it!



class User < ApplicationRecord
  def check_role(@role, name)
    @role ||= role_id == Role.find_by(name: name)&.id
  end

  def is_tradesman?
    check_role(@is_tradesman, 'Tradesman')
  end

  def is_employer?
    check_role(@is_employer, 'Employer')
  end

  def is_collaborator?
    check_role(@is_collaborator, 'Collaborator')
  end

  def can_access_forum?(args)
    @job = args[:job]
    @user = self
    return true if @user == @job.creator || @user.is_tradesman?
    false
  end

  def creator?(job)
    return true if job.creator == self
    false
  end

  def already_quoted?(job)
    quote = Quote.where(user_id: self.id, job_id: job.id)

    return true if quote.size >= 1
    false
  end

  def previous_quote_id(job)
    quote = Quote.where(user_id: self.id, job_id: job.id).first
    if quote.nil?
      return 0
    else
      return quote.id
    end
  end

  def previous_quote(job)
    quote = Quote.where(user_id: self.id, job_id: job.id).first
  end
end