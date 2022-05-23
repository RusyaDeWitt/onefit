import  React,{ useState } from 'react';
import { LanguageServiceMode } from 'typescript';
import Vacancies from '../data.json';
import './JobList.css';

function JobList() {

    const [languagess, addLanguage] = useState<string []>([])

    const setLang = (language: string) => {
        if(!languagess.includes(language)){
          addLanguage(languagess => [language,...languagess ]);
        }else{
          alert("Already in the list!")
        }
        
        console.log(languagess)
    }

    const clearArr = () => {
      addLanguage([])
    }

    const filtered = (arr_lang: string[], arr_level: string, arr_tools: string[] ) => {
      var temp: boolean = false
      for(let i = 0; i < languagess.length ; i++){
        if(!arr_lang.includes(languagess[i]) && !arr_level.includes(languagess[i]) && !arr_tools.includes(languagess[i])){
           return false
        }else{
          temp = true
        }
      };
      console.log(temp)
      return temp;
    }



    const deleteChoosed = (rolee: any) => {
        const tempList = languagess.filter((role) => role !== rolee)

        addLanguage(tempList)

        console.log(languagess)
    }

  return (
    <div className='Content'>
    { languagess.length > 0 ? 
        <div className='FilterBar'>
          <button className='Clear-Button' onClick={() => clearArr()}> Clear </button>
          {languagess.map((role,i) =>(
            <div className="Choosed-Filters-Box" key={i} onClick={() => deleteChoosed(role)}>
                <h1 className='Choosed-Filter-Name'>{role}</h1>
            </div>
          ))}
        </div> 
    : <h1></h1>}
    <div className="JobList">
      {languagess.length == 0 ? 
      <div className='UnfilteredList'>
      {Vacancies.vacancies.map((vacancy, i) =>(
              <div className='JobCard' key={i}>
                <div className='Main'>
                  <img src={vacancy.logo}/>
                    <div className='JobCard-Detail'>
                      <div className='Featured-New'>
                        <h1 className='Vacancy-Company'>{vacancy.company}</h1>
                        { vacancy.new == false ? <h3 className='inv'></h3> : 
                          <div className='Box'>
                            <div className='New-Box'><h1>NEW!</h1></div>
                            { vacancy.featured == false ? <h3></h3> : <div className='Featured-Box'><h1>FEATURED!</h1></div> }
                          </div>
                        }
                      </div>
                      <h2 className='Vacancy-Name'>{vacancy.position}</h2>
                      <h3 className='Vacancy-Company-Details'>{vacancy.postedAt}  •  {vacancy.contract}  •  {vacancy.location} </h3>
                    </div>  
                </div>
              <div className='Languages'>
                {vacancy.languages.map((language, i) => (
                    <button className="LanguageButton" key={i} onClick={() => setLang(language)}>{language}</button>
                  ))}
                {vacancy.tools.map((tools, i) => (
                    <button className="LanguageButton" key={i} onClick={() => setLang(tools)}>{tools}</button>
                  ))}
                    <button className="LanguageButton" key={i} onClick={() => setLang(vacancy.level)}>{vacancy.level}</button>
              </div>  
            </div>
            ))
            }
      </div> 
      : 
      <div className='FilteredList'>  
      {Vacancies.vacancies.filter(vacancy => filtered(vacancy.languages,vacancy.level,vacancy.tools )).map((vacancy, i) =>(
              <div className='JobCard' key={i}>
                <div className='Main'>
                  <img src={vacancy.logo}/>
                    <div className='JobCard-Detail'>
                      <div className='Featured-New'>
                        <h1 className='Vacancy-Company'>{vacancy.company}</h1>
                        { vacancy.new == false ? <h3></h3> : 
                          <div className='Box'>
                            <div className='New-Box'><h1>NEW!</h1></div>
                            { vacancy.featured == false ? <h3></h3> : <div className='Featured-Box'><h1>FEATURED!</h1></div> }
                          </div>
                        }
                      </div>
                      <h2 className='Vacancy-Name'>{vacancy.position}</h2>
                      <h3 className='Vacancy-Company-Details'>{vacancy.postedAt}  •  {vacancy.contract}  •  {vacancy.location} </h3>
                    </div>  
                </div>
              <div className='Languages'>
                {vacancy.languages.map((language, i) => (
                    <button className="LanguageButton" key={i} onClick={() => setLang(language)}>{language}</button>
                  ))}
                {vacancy.tools.map((tools, i) => (
                    <button className="LanguageButton" key={i} onClick={() => setLang(tools)}>{tools}</button>
                  ))}
                    <button className="LanguageButton" key={i} onClick={() => setLang(vacancy.level)}>{vacancy.level}</button>
              </div>  
            </div>
            ))
            }
      </div>
      }
    </div>
    </div>
  );
}

export default JobList;