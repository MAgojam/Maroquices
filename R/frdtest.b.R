
# This file is a generated template, your changes will not be overwritten

FrdTestClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "FrdTestClass",
    inherit = FrdTestBase,
    private = list(
        .init = function() {
            if (is.null(self$data) || is.null(self$options$vars)){
                print("Selecione as variáveis!")
                
            } else {
                
                data <- self$data
                k <-  ncol(data)
                nComps <- k*(k-1)/2
                measureNames <- self$options$get('vars')
                
                for (i in seq_len(nComps-1)) {
                    self$results$dunn$addRow(rowKey=i)
                    self$results$durbin$addRow(rowKey=i)
                    }
            }
        },
        .run = function() {
            
            if (is.null(self$data) || is.null(self$options$vars) ){
                return()
            } else {
                
                self$results$Frd$setVisible(visible = TRUE)    
                
                # `self$data` contains the data
                # `self$options` contains the options
                # `self$results` contains the results object (to populate)
                
                data <- self$data
                data <-data[complete.cases(data), ]
                n <- nrow(data)
                k <-  ncol(data)
                nComps <- k*(k-1)/2
                
                method <- self$options$method
                
                
                #Friedman com Coin
                set.seed(1969)
                table <- self$results$Frd
                
                cols <- colnames(data)
                data$id <- rownames(data)
                bd <- data |>
                    tidyr::gather(key = "treat", value = "score", all_of(cols))
                bd$treat <- as.factor(bd$treat)
                bd$id <- as.factor(bd$id)
                
                subset <- data.frame(y=bd$score, x=bd$treat)
                
                results <- coin::friedman_test(score~treat,data=bd)
                
                es <- coin::statistic(results)[1]/(n*(k-1))
                
                Frdex <- coin::friedman_test(score~treat,data=bd, distribution = "approximate") #Only works with two groups
                px <- coin::pvalue(Frdex)[1]
                
                #self$results$Frd$setContent(result)
                
                table$setRow(rowNo=1, values=list(
                    chiSq=coin::statistic(results)[1],
                    df=results@statistic@df,
                    p=coin::pvalue(results)[1],
                    px=px,
                    es=es[[1]]))
                
                self$results$plot$setVisible(visible = TRUE)   
                image <- self$results$plot
                image$setState(subset)
                
                
                #DUNN
                
                if (self$options$posts=="Dunn"){
                    
                    self$results$dunn$setVisible(visible = TRUE)  
                    
                # Calc for DunnTest - could not find a library, so I programm it
                    
                    comps <- vector()
                    stat <- vector("numeric")
                    zstat <- vector("numeric")
                    sig <- vector("numeric")
                    adjsig <- vector("numeric")
                    
                    dt <- as.data.frame(self$data)
                    rank <- t(apply(dt, 1, rank))
                    rankSum<-colSums(rank)
                    SE <- sqrt(k*(k+1)/(6*n))
                    
                    for (i in 1:(k-1)){
                        for (j in (i+1):k){
                            comps[length(comps)+1] <- paste(cols[i],"-",cols[j])
                            stat[length(stat)+1] <- ((rankSum[j]-rankSum[i])/n)|> round(3)
                            zstat[length(zstat)+1] <- (stat[length(stat)]/SE)|> round(3)
                            sig[length(sig)+1] <- (2*(1-pnorm(abs(zstat[length(zstat)]))))|> round(3)
                        }
                    }           

                    adjsig <-  (p.adjust(sig, method = method, n = length(sig)))|>round(3)
                    
                    resultsd <- data.frame (comps,stat,zstat,sig,adjsig)

                    table <- self$results$dunn
                    
                    self$results$dunn$setVisible(visible = TRUE)  
                    
                    pAdjTitle <- paste0("p<sub>aj</sub> (",method, ')')
                    table$getColumn('Padj')$setTitle(pAdjTitle)
                    
                    for (i in 1:nComps) {
                        table$setRow(rowNo=i, 
                                     values=list(
                                         var=resultsd$comps[[i]],
                                         Z=resultsd$zstat[[i]],
                                         p=resultsd$sig[[i]],
                                         Padj=resultsd$adjsig[[i]]
                                     ))}
                    
                } else { #Durbin-Conover
                 
                        if (self$options$posts=="Durbin-Conover"){
                            
                            self$results$durbin$setVisible(visible = TRUE) 
                            
                            result <- PMCMRplus::durbinAllPairsTest(y=bd$score, groups=bd$treat,
                                                                    blocks=bd$id,p.adjust='none')
                            resultsc <- PMCMRplus::durbinAllPairsTest(y=bd$score, groups=bd$treat,
                                                                  blocks=bd$id,p.adjust=method)                            
                            measureNames <- self$options$get('vars')
                            
                            colnm <- colnames(result$statistic)
                            rows <- rownames(result$statistic)
                            
                            table <- self$results$durbin
                              
                            n <- length(measureNames)-1
                            rowNo <- 1
                            for (j in 1:n) {
                                for (k in j:n) {
                                    table$setRow(rowNo=rowNo, 
                                        list(var=paste(colnm[j],"-",rows[k]),
                                        t=result$statistic[k,j],
                                        P=result$p.value[k,j],
                                        Padj=resultsc$p.value[k,j]
                                    ))
                                    rowNo <- rowNo + 1
                                }
                            }
                            
                            
                            pAdjTitle <- paste0("p<sub>aj</sub> (",method, ')')
                            table$getColumn('Padj')$setTitle(pAdjTitle)
                            
                        } else { #Nenhum
                          return()
                        }
                    }}},
        .plot=function(image, ...) {
            
            if (is.null(self$options$vars)){
                return()
                
            } else {    
                
                plotData <- image$state
                boxplot(y~x, data=plotData, 
                        frame=F, las=1,
                        xlab = "Amostras Emparelhadas", ylab="Scores")
                TRUE
            }
        })
)
